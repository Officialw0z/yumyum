// Base API URL
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

// API response types
interface ApiKeyResponse {
    key: string;
}

interface TenantResponse {
    name: string;
    id: string;
}

// Define the structure of a menu item
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    type: string;
}

// Define the structure of a menu response
interface MenuResponse {
    items: MenuItem[];
}

// Define the structure of an order request
interface Order {
    items: number[];
}

// Define the structure of an order response
export interface OrderResponse {
    id: string;
    status: string;
    items: string[];
    timestamp: string;
    eta: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: any | null; 
    receipt: string;
}

// Fetch an API key
export const getApiKey = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data: ApiKeyResponse = await response.json();
    return data.key;
};

// Register a new tenant
export const registerTenant = async (tenantName: string): Promise<TenantResponse> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/tenants`, {
        method: 'POST',
        headers: {
            'x-zocom': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name: tenantName })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
};

// Submit an order
export const submitOrder = async (tenantName: string, order: Order): Promise<OrderResponse> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/${tenantName}/orders`, {
        method: 'POST',
        headers: {
            'x-zocom': apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("📦 API response from submitOrder:", data);

    return {
        id: data.order.id,
        status: data.order.status,
        items: data.order.items,
        timestamp: data.order.timestamp,
        eta: data.order.eta,
        order: data.order.order,
        receipt: data.receipt
    };
};

// Fetch the menu from the API
export const getMenu = async (): Promise<MenuItem[]> => {
    const apiKey = await getApiKey();
    const response = await fetch(`${BASE_URL}/menu`, {
        method: 'get',
        headers: { 'x-zocom': apiKey, accept: 'application/json' },
    });
    const data: MenuResponse = await response.json();
    return data.items;
};

// Fetch all orders for a tenant
export const getOrder = async (tenantName: string): Promise<OrderResponse[]> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/${tenantName}/orders`, {
        method: 'GET',
        headers: {
            'x-zocom': apiKey,
            'Accept': 'application/json'
        },
    });

    const data = await response.json();
    return data.items;
};

// Fetch an order by ID
export const getOrderById = async (tenantName: string, orderId: string): Promise<OrderResponse> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/${tenantName}/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'x-zocom': apiKey,
            'Accept': 'application/json'
        },
    });

    const data: OrderResponse = await response.json();
    return data;
};

// Fetch a receipt by ID
export const getReceiptById = async (receiptId: string): Promise<OrderResponse> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/receipts/${receiptId}`, {
        method: 'GET',
        headers: {
            'x-zocom': apiKey,
            'Accept': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: OrderResponse = await response.json();
    console.log("🧾 API response from getReceiptById:", data);
    return data;
};
