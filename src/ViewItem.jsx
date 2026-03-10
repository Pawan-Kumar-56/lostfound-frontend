import React, { useState, useEffect } from 'react';
import { itemsAPI } from "./services/api";
import { storage } from "./services/api";
import { useNavigate } from 'react-router-dom';
import './ViewItem.css';

const ViewItem = () => {
  const navigate = useNavigate();

  // Get current user
  const currentUser = storage.getUser();

  // State for items and filters
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      // Get items from backend API with larger page size to get all items
      const response = await itemsAPI.getAll(0, 50); // Request 50 items to get all 15

      console.log('=== VIEW ITEM DEBUG ===');
      console.log('Raw API response:', response);
      console.log('Response type:', typeof response);
      console.log('Response keys:', Object.keys(response));
      console.log('Response content:', response.content);
      console.log('Content type:', typeof response.content);
      console.log('Items count:', response.content?.length || 0);
      console.log('Total elements in database:', response.totalElements);
      console.log('Load timestamp:', new Date().toISOString());
      console.log('====================');

      // Transform backend data to frontend format
      const transformedItems = response.content.map(item => ({
        id: item.id,
        itemName: item.itemName,
        description: item.description,
        category: item.category,
        location: item.location,
        date: item.itemDate,
        itemType: item.itemType.toLowerCase(),
        contactInfo: item.contactInfo,
        image:
          item.imageUrl && item.imageUrl.startsWith('data:')
            ? item.imageUrl
            : item.imageUrl || 'https://picsum.photos/300/200?random=' + item.id,
        postedBy: item.postedBy,
        postedDate: item.postedAt
      }));

      console.log('Transformed items:', transformedItems);

      setItems(transformedItems);
    } catch (error) {
      console.error('Failed to load items:', error);
      setItems([]);
    }
    setLoading(false);
  };

  // Filter items
  useEffect(() => {
    let filtered = items;

    if (filter !== 'all') {
      filtered = filtered.filter(item => item.itemType === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [filter, searchTerm, items]);

  const handleItemClick = (item) => {
    alert(
`Item Details:

Name: ${item.itemName}
Type: ${item.itemType}
Location: ${item.location}
Contact: ${item.contactInfo}

Contact the poster for more information.`
    );
  };

  const getTypeColor = (type) => {
    return type === 'lost' ? '#ff6b6b' : '#28a745';
  };

  const getTypeIcon = (type) => {
    return type === 'lost' ? '🔍' : '📦';
  };

  const getFilterTitle = () => {
    if (filter === 'lost') return 'Lost Items';
    if (filter === 'found') return 'Found Items';
    return 'All Lost & Found Items';
  };

  if (loading) {
    return (
      <div className="view-item-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-item-container">
      <div className="view-item-header">
        <h1>{getFilterTitle()}</h1>
        <p>Browse through reported lost and found items</p>
        <p>Total Items: {items.length} | Showing: {filteredItems.length}</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items by name, description, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Items
          </button>

          <button
            className={`filter-btn ${filter === 'lost' ? 'active' : ''}`}
            onClick={() => setFilter('lost')}
          >
            🔍 Lost Items
          </button>

          <button
            className={`filter-btn ${filter === 'found' ? 'active' : ''}`}
            onClick={() => setFilter('found')}
          >
            📦 Found Items
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <div className="no-items-icon">📭</div>
            <h3>No items found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.itemName} />

                <div
                  className="item-type-badge"
                  style={{ backgroundColor: getTypeColor(item.itemType) }}
                >
                  {getTypeIcon(item.itemType)} {item.itemType}
                </div>
              </div>

              <div className="item-content">
                <h3 className="item-name">{item.itemName}</h3>
                <p className="item-description">{item.description}</p>

                <div className="item-details">
                  <div className="detail-item">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{item.category}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{item.location}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="item-footer">
                  <span className="posted-by">Posted by {item.postedBy}</span>
                  <button className="contact-btn">Contact</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Back Button */}
      <div className="back-section">
        <button
          className="back-btn"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewItem;