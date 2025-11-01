/** Converts speed from Meters per second (m/s) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInMetersPerSecond - Number value in Meters per second to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const metersPerSecondToUnit = (unit: string, valueInMetersPerSecond: number): number => {
    switch (unit) {
        // Return Meters per second (m/s) as is
        case 'Meters per second (m/s)': {
            return valueInMetersPerSecond;
        }
        // Convert Meters per second (m/s) to Kilometers per hour (km/h)
        case 'Kilometers per hour (km/h)': {
            return valueInMetersPerSecond * 3.6;
        }
        // Convert Meters per second (m/s) to Miles per hour (mph)
        case 'Miles per hour (mph)': {
            return valueInMetersPerSecond * 2.23693629205;
        }
        // Convert Meters per second (m/s) to Feet per second (ft/s)
        case 'Feet per second (ft/s)': {
            return valueInMetersPerSecond * 3.28083989501;
        }
        // Convert Meters per second (m/s) to Knots (kn)
        case 'Knots (kn)': {
            return valueInMetersPerSecond * 1.94384449244;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown speed unit');
        }
    }
};

/** Converts speed from the specified source unit to Meters per second (m/s)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Meters per second (Number)
 * @returns Converted value in Meters per second (m/s) (Number)
 */
const speedToMetersPerSecond = (unit: string, value: number): number => {
    switch (unit) {
        // Return Meters per second (m/s) as is
        case 'Meters per second (m/s)': {
            return value;
        }
        // Convert Kilometers per hour (km/h) to Meters per second (m/s)
        case 'Kilometers per hour (km/h)': {
            return value / 3.6;
        }
        // Convert Miles per hour (mph) to Meters per second (m/s)
        case 'Miles per hour (mph)': {
            return value / 2.23693629205;
        }
        // Convert Feet per second (ft/s) to Meters per second (m/s)
        case 'Feet per second (ft/s)': {
            return value / 3.28083989501;
        }
        // Convert Knots (kn) to Meters per second (m/s)
        case 'Knots (kn)': {
            return value / 1.94384449244;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown speed unit');
        }
    }
};

/** Speed Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertSpeed = (from: string, to: string, value: number): number => {
    // Convert source unit to Meters per second (m/s)
    const inMetersPerSecond = speedToMetersPerSecond(from, value);

    // Convert from Meters per second (m/s) to target unit
    const result = metersPerSecondToUnit(to, inMetersPerSecond);

    return result;
};

export default convertSpeed;