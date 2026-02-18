const API_URL = 'http://localhost:7001/api';

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/get-product`);
    const json = await response.json();
    // We reach into the structure you just built in the controller!
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
        // Log the exact validation errors from Zod to the console
        if (json.errors) {
            console.table(json.errors); // This will show a nice table of what failed
        }
        throw new Error(json.message || 'Failed to add product');
    }
    return json.data.product;
};