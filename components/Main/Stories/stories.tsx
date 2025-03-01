export interface Story {
    date: string | number | Date;
    id: number;
    title: string;
    images: string[];
    logo: string;
    viewed: boolean;
}