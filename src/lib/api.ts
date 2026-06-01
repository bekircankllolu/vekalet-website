const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, options: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, ...init } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((init.headers as Record<string, string> | undefined) ?? {}),
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface GraveResponse {
  id: string;
  cemetery_name: string;
  city: string;
}

export interface OrderResponse {
  id: string;
  status: string;
  total_kurus: number;
}

export interface CheckoutResponse {
  payment: { id: string };
  token: string;
  checkoutFormContent: string;
  paymentPageUrl: string | null;
}

export async function registerProfile(token: string, userId: string, fullName: string, phone: string) {
  return request('/auth/register', {
    method: 'POST',
    token,
    body: JSON.stringify({ userId, fullName, phone, role: 'seeker', consentKvkk: true }),
  });
}

export async function createGrave(
  token: string,
  params: {
    cemeteryName: string;
    city: string;
    district?: string;
    description?: string;
  },
) {
  return request<GraveResponse>('/graves', {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

export async function createOrder(
  token: string,
  params: {
    graveId: string;
    scheduledStartAt: string;
    scheduledEndAt: string;
    note?: string;
    items: Array<{ serviceId: string; quantity: number; addonIds: string[] }>;
  },
) {
  return request<OrderResponse>('/orders', {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

export async function startCheckout(token: string, orderId: string) {
  return request<CheckoutResponse>('/payments/checkout', {
    method: 'POST',
    token,
    body: JSON.stringify({ orderId }),
  });
}

export async function listGraves(token: string) {
  return request<GraveResponse[]>('/graves', {
    method: 'GET',
    token,
  });
}

export async function getServices(token?: string) {
  return request<any[]>('/services', {
    method: 'GET',
    token,
  });
}

export async function listOrders(token: string) {
  return request<any[]>('/orders', {
    method: 'GET',
    token,
  });
}

export async function getOrder(token: string, id: string) {
  return request<any>(`/orders/${id}`, {
    method: 'GET',
    token,
  });
}

export async function confirmOrder(token: string, id: string) {
  return request<any>(`/orders/${id}/confirm`, {
    method: 'PATCH',
    token,
  });
}

export async function listNearby(token: string) {
  return request<any[]>('/orders/nearby', {
    method: 'GET',
    token,
  });
}

export async function acceptOrder(token: string, id: string) {
  return request<any>(`/orders/${id}/accept`, {
    method: 'PATCH',
    token,
  });
}

export async function startOrder(token: string, id: string) {
  return request<any>(`/orders/${id}/start`, {
    method: 'PATCH',
    token,
  });
}

export async function completeOrder(token: string, id: string) {
  return request<any>(`/orders/${id}/complete`, {
    method: 'PATCH',
    token,
  });
}

export async function createProofMetadata(
  token: string,
  orderId: string,
  params: {
    mediaType: 'photo' | 'video';
    storagePath: string;
    latitude?: number;
    longitude?: number;
  },
) {
  return request<any>(`/orders/${orderId}/proofs`, {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

export async function getProofUploadUrl(
  token: string,
  orderId: string,
  params: {
    mediaType: 'photo' | 'video';
    extension: string;
  },
) {
  return request<{ signedUrl: string; token: string; storagePath: string }>(`/orders/${orderId}/proof-upload-url`, {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

export async function getServiceAreas(token: string) {
  return request<any[]>('/providers/service-areas', {
    method: 'GET',
    token,
  });
}

export async function addServiceArea(
  token: string,
  params: {
    city: string;
    district?: string;
    cemeteryName?: string;
  },
) {
  return request<any>('/providers/service-areas', {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

export async function createReview(
  token: string,
  params: {
    orderId: string;
    providerId: string;
    rating: number;
    comment?: string;
  },
) {
  return request<any>('/reviews', {
    method: 'POST',
    token,
    body: JSON.stringify(params),
  });
}

