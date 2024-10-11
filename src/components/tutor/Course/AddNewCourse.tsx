import React, { useEffect, useRef, useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { addCourseAPI, uploadVideoAPI, uploadThumbnailAPI, fetchCategoriesAPI } from '@/api/tutorAPI/tutorAxios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

interface VideoInput {
    title: string;
    description: string;
    file: File | null;
    url?: string;
}

interface CourseInput {
  title: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  videos: VideoInput[];
  level: string;
  thumbnail: File | null;
  duration: number;
}

interface Category {
  _id: string;
  name: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  tags?: string;
  category?: string;
  price?: string;
  videos?: string[];
  level?: string;
  thumbnail?: string;
  duration?: string;
}

const AddNewCourse: React.FC = () => {
  const [course, setCourse] = useState<CourseInput>({
    title: '',
    description: '',
    tags: [],
    category: '',
    price: 0,
    videos: [],
    level: '',
    thumbnail: null,
    duration: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { tutorInfo } = useSelector((state: RootState) => state.tutor);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await fetchCategoriesAPI();
        setCategories(fetchedCategories?.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !course.tags.includes(newTag)) {
      setCourse({ ...course, tags: [...course.tags, newTag] });
      setTagInput('');
      setErrors(prev => ({ ...prev, tags: undefined }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourse({ ...course, tags: course.tags.filter(tag => tag !== tagToRemove) });
  };

  const addVideo = () => {
    setCourse({
      ...course,
      videos: [...course.videos, { title: '', description: '', file: null }],
    });
  };

  const handleVideoChange = (index: number, field: keyof VideoInput, value: string | File | null) => {
    const updatedVideos = course.videos.map((video, i) =>
      i === index ? { ...video, [field]: value } : video
    );
    setCourse({ ...course, videos: updatedVideos });
    setErrors(prev => {
      const newVideoErrors = [...(prev.videos || [])];
      newVideoErrors[index] = '';
      return { ...prev, videos: newVideoErrors };
    });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !file.type.startsWith('video/')) {
      setErrors(prev => {
        const newVideoErrors = [...(prev.videos || [])];
        newVideoErrors[index] = 'Please select only video files.';
        return { ...prev, videos: newVideoErrors };
      });
    } else {
      handleVideoChange(index, 'file', file);
    }
  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, thumbnail: 'Please select only image files.' }));
    } else {
      setCourse({ ...course, thumbnail: file });
      setErrors(prev => ({ ...prev, thumbnail: undefined }));
    }
  
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  const removeVideo = (index: number) => {
    const updatedVideos = course.videos.filter((_, i) => i !== index);
    setCourse({ ...course, videos: updatedVideos });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!course.title.trim()) newErrors.title = 'Title is required';
    if (course.description.trim().split(/\s+/).length < 30) newErrors.description = 'Description should be at least 30 words';
    if (course.tags.length === 0) newErrors.tags = 'At least one tag is required';
    if (!course.category) newErrors.category = 'Category is required';
    if (course.price <= 0) newErrors.price = 'Price should be a non-zero positive number';
    if (!course.level) newErrors.level = 'Level is required';
    if (!course.thumbnail) newErrors.thumbnail = 'Thumbnail is required';
    if (course.duration <= 0) newErrors.duration = 'Duration should be a non-zero positive number';

    const videoErrors: string[] = [];
    course.videos.forEach((video, index) => {
      if (!video.title.trim()) videoErrors[index] = 'Video title is required';
      if (!video.description.trim()) videoErrors[index] = 'Video description is required';
      if (!video.file) videoErrors[index] = 'Video file is required';
    });

    if (videoErrors.length > 0) newErrors.videos = videoErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUploading(true);
    try {
      const uploadedVideos = await Promise.all(course.videos.map(async (video) => {
        if (video.file) {
          try {
            const videoData = await uploadVideoAPI(video.file);
            return {
              title: video.title,
              description: video.description,
              url: videoData.url,
            };
          } catch (error) {
            console.error(`Error uploading video ${video.title}:`, error);
            return null;
          }
        }
        return null; 
      }));

      let thumbnailUrl = '';
      if (course.thumbnail) {
        try {
          const thumbnailData = await uploadThumbnailAPI(course.thumbnail);
          thumbnailUrl = thumbnailData.url;
        } catch (error) {
          console.error('Error uploading thumbnail:', error);
          setErrors(prev => ({ ...prev, thumbnail: 'Failed to upload thumbnail' }));
          setIsUploading(false);
          return;
        }
      }

      const validVideos = uploadedVideos.filter((video) => video !== null);

      const response = await addCourseAPI(
        tutorInfo?._id ?? '',
        course.title,
        course.description,
        course.tags,
        course.category,
        course.price,
        course.level,
        thumbnailUrl,
        course.duration,
        validVideos
      );

      if (response.status === 201) {
        navigate('/tutor/course-list')
        console.log('Course added successfully:', response.data);
      } else {
        console.error('Failed to add course:', response.data);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Course</h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {course.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-800 hover:text-blue-900">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={handleTagKeyPress}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {errors.tags && <p className="mt-1 text-xs text-red-500">{errors.tags}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Course Category
            </label>
            <select
              id="category"
              name="category"
              value={course.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={course.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Course Level
            </label>
            <select
              id="level"
              name="level"
              value={course.level}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            {errors.level && <p className="mt-1 text-xs text-red-500">{errors.level}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
              Course Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              ref={thumbnailInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {course.thumbnail && (
              <p className="mt-1 text-sm text-gray-600">
                Selected file: {course.thumbnail.name}
              </p>
            )}
            {errors.thumbnail && <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Course Duration (hours)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={course.duration}
              onChange={handleInputChange}
              min="0"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration}</p>}
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Videos</h2>
            {course.videos.map((video, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium">Video {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Video Description"
                  value={video.description}
                  onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                ></textarea>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {video.file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected file: {video.file.name}
                  </p>
                )}
                {errors.videos && errors.videos[index] && (
                  <p className="mt-1 text-xs text-red-500">{errors.videos[index]}</p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVideo}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} className="mr-1" /> Add Video
            </button>
          </div>

          <div className="mt-6">
          <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isUploading}
          >
              {isUploading ? 'Uploading...' : 'Create Course'}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCourse;