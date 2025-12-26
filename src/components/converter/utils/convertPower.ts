/** Converts power from Watts (W) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInWatts - Number value in Watts to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const wattsToUnit = (unit: string, valueInWatts: number): number => {
    switch (unit) {
        // Return Watts (W) as is
        case 'Watts (W)': {
            return valueInWatts;
        }
        // Convert Watts (W) to Kilowatts (kW)
        case 'Kilowatts (kW)': {
            return valueInWatts * 0.001;
        }
        // Convert Watts (W) to Horsepower (hp)
        case 'Horsepower (hp)': {
            return valueInWatts * 0.00134102209;
        }
        // Convert Watts (W) to Foot-pounds per second (ft-lb/s)
        case 'Foot-pounds per second (ft-lb/s)': {
            return valueInWatts * 0.7375621493;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown power unit');
        }
    }
};

/** Converts power from the specified source unit to Watts (W)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Watts (Number)
 * @returns Converted value in Watts (W) (Number)
 */
const powerToWatts = (unit: string, value: number): number => {
    switch (unit) {
        // Return Watts (W) as is
        case 'Watts (W)': {
            return value;
        }
        // Convert Kilowatts (kW) to Watts (W)
        case 'Kilowatts (kW)': {
            return value * 1000;
        }
        // Convert Horsepower (hp) to Watts (W)
        case 'Horsepower (hp)': {
            return value * 745.699871582;
        }
        // Convert Foot-pounds per second (ft-lb/s) to Watts (W)
        case 'Foot-pounds per second (ft-lb/s)': {
            return value * 1.3558179483;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown power unit');
        }
    }
};

/** Power Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertPower = (from: string, to: string, value: number): number => {
    // Convert source unit to Watts (W)
    const inWatts = powerToWatts(from, value);

    // Convert from Watts (W) to target unit
    const result = wattsToUnit(to, inWatts);

    return result;
};

export default convertPower;