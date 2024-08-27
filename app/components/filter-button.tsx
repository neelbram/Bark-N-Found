import React, { useState, ChangeEvent } from 'react';
import Modal from 'react-modal';

interface Filters {
    animalKind: string;
    sex: string;
    color: string;
    size: string;
}

interface FilterButtonProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filters, setFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    return (
        <>
            <button className='filter-button' onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-filter"></i>
            </button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Filter Options"
                className="filter-modal"
                overlayClassName="filter-modal-overlay"
            >
                <h2>Filter Options</h2>
                <div className="filter-group">
                    <label>Animal Kind</label>
                    <select name="animalKind" value={filters.animalKind} onChange={handleFilterChange}>
                        <option value="">All Animals</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bunny">Bunny</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Sex</label>
                    <select name="sex" value={filters.sex} onChange={handleFilterChange}>
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Color</label>
                    <select name="color" value={filters.color} onChange={handleFilterChange}>
                        <option value="">All Colors</option>
                        <option value="Black">Black</option>
                        <option value="Dark Brown">Dark Brown</option>
                        <option value="Light Brown">Light Brown</option>
                        <option value="White">White</option>
                        <option value="Ginger">Ginger</option>
                        <option value="Mix">Mix</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Size</label>
                    <select name="size" value={filters.size} onChange={handleFilterChange}>
                        <option value="">All Sizes</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <button className="apply-button" onClick={() => setIsModalOpen(false)}>Apply</button>
            </Modal>
        </>
    );
};

export default FilterButton;
