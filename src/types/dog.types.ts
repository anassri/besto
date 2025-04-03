export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next: string;
    prev: string;
}

export interface Match {
    match: string;
}

export type DogSearchInputs = {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: number;
    sort?: string;
};
