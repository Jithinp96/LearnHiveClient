import React from 'react';

interface SkillCardProps {
    name: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
    </div>
);

export default SkillCard;