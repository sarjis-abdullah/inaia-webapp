
export const camelToUnderscore = (input: string):string=> {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
export const objectToQueryString = (obj: Record<string, any>): string => {
    const params = new URLSearchParams();
  
    for (const key in obj) {
      if (obj[key] && Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
  
        const formattedKey = key === 'perPage' ? camelToUnderscore(key) : key;

        params.append(formattedKey, value.toString());
      }
    }
  
    return params.toString();
}