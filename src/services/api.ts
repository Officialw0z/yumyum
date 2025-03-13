// BASE URL
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

// Type for API-key response
interface ApiKeyResponse {
    key: string;
}

// Type for Tenant
interface TenantResponse {
    name: string;
    id: string;
}

// Type for Menu Item
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    type: string;
}

// Type for Menu response (including items)
interface MenuResponse {
    items: MenuItem[];
}

// Type for Order
interface Order {
    items: number[];
}

// Type for Order response
export interface OrderResponse {
    id: string;
    status: string ;
    items: string[];
    timestamp: string;
    eta: string; // eta as string or null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: any | null;
}

// FETCH api-key
export const getApiKey = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data: ApiKeyResponse = await response.json();
    return data.key;
};

// Create Tenant
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

// Send order
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
    console.log("📦 API-respons från submitOrder:", data); // 👈 Logga vad vi får tillbaka

    // 💡 FIX: Returnera direkt det vi behöver
    return {
        id: data.order.id, // 👈 Plocka ut orderns ID
        status: data.order.status,
        items: data.order.items,
        timestamp: data.order.timestamp,
        eta: data.order.eta, // 👈 Plocka ut beräknad leveranstid
        order: data.order.order,
    };
};

// FETCH menu
export const getMenu = async (): Promise<MenuItem[]> => {
    const apIkey = await getApiKey();
    const response = await fetch(`${BASE_URL}/menu`, {
        method: 'get',
        headers: { 'x-zocom': apIkey, accept: 'application/json' },
    });
    const data: MenuResponse = await response.json();  // Typa som MenuResponse
    
    // Returnera direkt data.items, eftersom den redan matchar MenuItem[]
    return data.items;
};

// FETCH all orders
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

// FETCH order by ID
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

// FETCH receipt by ID
export const getReceiptById = async (receiptId: string): Promise<void> => {
    const apiKey = await getApiKey();

    const response = await fetch(`${BASE_URL}/receipts/${receiptId}`, {
        method: 'GET',
        headers: {
            'x-zocom': apiKey,
            'Accept': 'application/json'
        },
    });

    return response.json();
};
