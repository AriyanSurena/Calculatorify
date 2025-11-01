/** Converts angle from Radians (rad) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInRadians - Number value in Radians to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const radiansToUnit = (unit: string, valueInRadians: number): number => {
    switch (unit) {
        // Return Radians (rad) as is
        case 'Radians (rad)': {
            return valueInRadians;
        }
        // Convert Radians (rad) to Degrees (deg)
        case 'Degrees (deg)': {
            return valueInRadians * 57.2957795131;
        }
        // Convert Radians (rad) to Gradians (grad)
        case 'Gradians (grad)': {
            return valueInRadians * 63.6619772368;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown angle unit');
        }
    }
};

/** Converts angle from the specified source unit to Radians (rad)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Radians (Number)
 * @returns Converted value in Radians (rad) (Number)
 */
const angleToRadians = (unit: string, value: number): number => {
    switch (unit) {
        // Return Radians (rad) as is
        case 'Radians (rad)': {
            return value;
        }
        // Convert Degrees (deg) to Radians (rad)
        case 'Degrees (deg)': {
            return value * 0.01745329252;
        }
        // Convert Gradians (grad) to Radians (rad)
        case 'Gradians (grad)': {
            return value * 0.01570796327;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown angle unit');
        }
    }
};

/** Angle Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertAngle = (from: string, to: string, value: number): number => {
    // Convert source unit to Radians (rad)
    const inRadians = angleToRadians(from, value);

    // Convert from Radians (rad) to target unit
    const result = radiansToUnit(to, inRadians);

    return result;
};

export default convertAngle;