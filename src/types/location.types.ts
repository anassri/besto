export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface LocationSearchResponse {
    results: Location[];
    total: number;
}

interface GeoBoundingBox {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: Coordinates;
    top_left?: Coordinates;
}

export type LocationSearchInputs = {
    city?: string;
    states?: string[];
    geoBoundingBox?: GeoBoundingBox;
    size?: number;
    from?: number;
};
