/** Converts time from Seconds (s) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInSeconds - Number value in Seconds to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const secondsToUnit = (unit: string, valueInSeconds: number): number => {
    switch (unit) {
        // Return Seconds (s) as is
        case 'Seconds (s)': {
            return valueInSeconds;
        }
        // Convert Seconds (s) to Milliseconds (ms)
        case 'Milliseconds (ms)': {
            return valueInSeconds * 1000;
        }
        // Convert Seconds (s) to Minutes (min)
        case 'Minutes (min)': {
            return valueInSeconds / 60;
        }
        // Convert Seconds (s) to Hours (h)
        case 'Hours (h)': {
            return valueInSeconds / 3600;
        }
        // Convert Seconds (s) to Days (d)
        case 'Days (d)': {
            return valueInSeconds / 86400;
        }
        // Convert Seconds (s) to Years (yr)
        case 'Years (yr)': {
            return valueInSeconds / 31536000;
        }
        // Convert Seconds (s) to Weeks (wk)
        case 'Weeks (wk)': {
            return valueInSeconds / 604800;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown time unit');
        }
    }
};

/** Converts time from the specified source unit to Seconds (s)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Seconds (Number)
 * @returns Converted value in Seconds (s) (Number)
 */
const timeToSeconds = (unit: string, value: number): number => {
    switch (unit) {
        // Return Seconds (s) as is
        case 'Seconds (s)': {
            return value;
        }
        // Convert Milliseconds (ms) to Seconds (s)
        case 'Milliseconds (ms)': {
            return value / 1000;
        }
        // Convert Minutes (min) to Seconds (s)
        case 'Minutes (min)': {
            return value * 60;
        }
        // Convert Hours (h) to Seconds (s)
        case 'Hours (h)': {
            return value * 3600;
        }
        // Convert Days (d) to Seconds (s)
        case 'Days (d)': {
            return value * 86400;
        }
        // Convert Years (yr) to Seconds (s)
        case 'Years (yr)': {
            return value * 31536000;
        }
        // Convert Weeks (wk) to Seconds (s)
        case 'Weeks (wk)': {
            return value * 604800;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown time unit');
        }
    }
};

/** Time Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertTime = (from: string, to: string, value: number): number => {
    // Convert source unit to Seconds (s)
    const inSeconds = timeToSeconds(from, value);

    // Convert from Seconds (s) to target unit
    const result = secondsToUnit(to, inSeconds);

    return result;
};

export default convertTime;