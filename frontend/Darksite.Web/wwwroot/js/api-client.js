/**
 * DARKSITE - API Client
 * Handles all API communication with backend
 * Study Purpose Only
 */

const DarksiteAPI = (function () {
    'use strict';

    const API_BASE_URL = 'https://localhost:7001/api';

    // Helper function for API calls
    async function apiCall(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Bounty API
    const Bounty = {
        getAll: async () => {
            return await apiCall('/bounty');
        },

        getById: async (id) => {
            return await apiCall(`/bounty/${id}`);
        },

        getByThreatLevel: async (level) => {
            return await apiCall(`/bounty/threat-level/${level}`);
        },

        create: async (bountyData) => {
            return await apiCall('/bounty', {
                method: 'POST',
                body: JSON.stringify(bountyData),
            });
        },
    };

    // Auth API
    const Auth = {
        login: async (email, password) => {
            return await apiCall('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
        },

        register: async (name, email, password) => {
            return await apiCall('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });
        },
    };

    // Public API
    return {
        Bounty,
        Auth,
    };
})();

// Export for use in other scripts
window.DarksiteAPI = DarksiteAPI;
