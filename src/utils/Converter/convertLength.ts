/** Converts Length to the Meters (m)
 * @param unit Unit Type as String
 * @param value Number value in Length to convert to Meters (m)
 * @returns Converted value in the Meters (m)
 */
const lengthToMeters = (unit: string, value: number): number => {
    switch (unit) {
        // Convert to Meters (m)
        case 'Meters (m)': {
            return value;
        }
        // Convert Kilometers (km) to Meters (m)
        case 'Kilometers (km)': {
            return value * 1000;
        }
        // Convert Centimeters (cm) to Meters (m)
        case 'Centimeters (cm)': {
            return value / 100;
        }
        // Convert Millimeters (mm) to Meters (m)
        case 'Millimeters (mm)': {
            return value / 1000;
        }
        // Convert Miles (mi) to Meters (m)
        case 'Miles (mi)': {
            return value * 1609.344;
        }
        // Convert Feet (ft) to Meters (m)
        case 'Feet (ft)': {
            return value * 0.3048;
        }
        // Convert Inches (in) to Meters (m)
        case 'Inches (in)': {
            return value * 0.0254;
        }
        // Convert Yards (yd) to Meters (m)
        case 'Yards (yd)': {
            return value * 0.9144;
        }
        // Convert Nanometers (nm) to Meters (m)
        case 'Nanometers (nm)': {
            return value * 0.000000001;
        }
        // if input value or unit has error:
        default: {
            throw new Error('Unknown length unit');
        }
    }
};

/** Converts Meters to the specified unit
 * @param unit Unit Type as String
 * @param valueInMeters Number value in Meters to convert
 * @returns Converted value in the target unit
 */
const metersToUnit = (unit: string, valueInMeters: number): number => {
    switch (unit) {
        // Convert to Meters (m)
        case 'Meters (m)': {
            return valueInMeters;
        }
        // Convert Meters (m) to Kilometers (km)
        case 'Kilometers (km)': {
            return valueInMeters / 1000;
        }
        // Convert Meters (m) to Centimeters (cm)
        case 'Centimeters (cm)': {
            return valueInMeters * 100;
        }
        // Convert Meters (m) to Millimeters (mm)
        case 'Millimeters (mm)': {
            return valueInMeters * 1000;
        }
        // Convert Meters (m) to Miles (mi)
        case 'Miles (mi)': {
            return valueInMeters / 1609.344;
        }
        // Convert Meters (m) to Feet (ft)
        case 'Feet (ft)': {
            return valueInMeters / 0.3048;
        }
        // Convert Meters (m) to Inches (in)
        case 'Inches (in)': {
            return valueInMeters / 0.0254;
        }
        // Convert Meters (m) to Yards (yd)
        case 'Yards (yd)': {
            return valueInMeters / 0.9144;
        }
        // Convert Meters (m) to Nanometers (nm)
        case 'Nanometers (nm)': {
            return valueInMeters * 1000000000;
        }
        // if Destination value or unit has error:
        default: {
            throw new Error('Destination length value or unit invalid');
        }
    }
};

/**
 * Length Unit Conversion Function
 * @param from Source Unit (String)
 * @param to Destination Unit (String)
 * @param value The Value To Be Converted (Number)
 * @returns Returns The Result Of The Conversion Of Units Of Length (Number)
 */
export const convertLength = (from: string, to: string, value: number): number => {
    // Convert to Meters (m)
    const inMeters = lengthToMeters(from, value);
    // Convert to Destination Unit
    const result = metersToUnit(to, inMeters);
    return result;
};