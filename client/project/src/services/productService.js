const API_URL = 'http://localhost:7001/api';

/**
 * [Frontend API Layer]:
 * This file translates Backend JSON responses into usable data for React.
 */

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/get-product`);
    const json = await response.json();
    
    // [The Bridge]: We match the { data: { products: [...] } } 
    // structure defined in our productController.mjs
    return json.data.products; 
};

export const addProduct = async (productData) => {
    const response = await fetch(`${API_URL}/add-product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });

    const json = await response.json();

    if (!response.ok) {
        // [Zod Error Table]: If the backend validation fails, we show
        // exactly which fields failed in the browser console.
        if (json.errors) {
            console.table(json.errors); 
        }
        throw new Error(json.message || 'Failed to add product');
    }
    return json.data.product;
};

export const delProduct = async (id) => {
    if (!id) throw new Error("ID is required");

    const response = await fetch(`${API_URL}/delete-product/${id}`, {
        method: 'DELETE',
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message || 'Failed to delete product');
    }

    // [Safe Access]: We check for data first to avoid "Cannot read property of undefined"
    return json.data?.product || true; 
};

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_URL}/update-product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message || `Error: ${response.status}`);
    }
    
    // [Optional Chaining]: json.data?.product is the safest way to grab data
    return json.data?.product || json;
};