/** Converts energy from Joules (J) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInJoules - Number value in Joules to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const joulesToUnit = (unit: string, valueInJoules: number): number => {
    switch (unit) {
        // Return Joules (J) as is
        case 'Joules (J)': {
            return valueInJoules;
        }
        // Convert Joules (J) to Kilojoules (kJ)
        case 'Kilojoules (kJ)': {
            return valueInJoules * 0.001;
        }
        // Convert Joules (J) to Watt-hours (Wh)
        case 'Watt-hours (Wh)': {
            return valueInJoules / 3600;
        }
        // Convert Joules (J) to Kilowatt-hours (kWh)
        case 'Kilowatt-hours (kWh)': {
            return valueInJoules / 3600000;
        }
        // Convert Joules (J) to Calories (cal)
        case 'Calories (cal)': {
            return valueInJoules * 0.2388459;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown energy unit');
        }
    }
};

/** Converts energy from the specified source unit to Joules (J)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Joules (Number)
 * @returns Converted value in Joules (J) (Number)
 */
const energyToJoules = (unit: string, value: number): number => {
    switch (unit) {
        // Return Joules (J) as is
        case 'Joules (J)': {
            return value;
        }
        // Convert Kilojoules (kJ) to Joules (J)
        case 'Kilojoules (kJ)': {
            return value * 1000;
        }
        // Convert Watt-hours (Wh) to Joules (J)
        case 'Watt-hours (Wh)': {
            return value * 3600;
        }
        // Convert Kilowatt-hours (kWh) to Joules (J)
        case 'Kilowatt-hours (kWh)': {
            return value * 3600000;
        }
        // Convert Calories (cal) to Joules (J)
        case 'Calories (cal)': {
            return value * 4.184;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown energy unit');
        }
    }
};

/** Energy Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertEnergy = (from: string, to: string, value: number): number => {
    // Convert source unit to Joules (J)
    const inJoules = energyToJoules(from, value);

    // Convert from Joules (J) to target unit
    const result = joulesToUnit(to, inJoules);

    return result;
};

export default convertEnergy;