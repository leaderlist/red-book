declare function get_payload(lm: any): string;
declare function getXYW(payload: any): {
    'X-s': string;
    'X-t': number;
};
declare function decode(j: any): string;
