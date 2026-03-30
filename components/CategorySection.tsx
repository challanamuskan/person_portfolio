import React from 'react';
import ContentRow from './ContentRow';
import type { PortfolioItem } from '../types';

interface CategorySectionProps {
    title: string;
    items: PortfolioItem[];
    onCardClick: (item: PortfolioItem) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, items, onCardClick }) => {
    return <ContentRow title={title} items={items} onCardClick={onCardClick} />;
};

export default CategorySection;
