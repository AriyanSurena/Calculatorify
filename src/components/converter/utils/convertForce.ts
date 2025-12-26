/** Converts force from Newtons (N) to the specified destination unit
 * @param unit - Unit Type as String (String)
 * @param valueInNewtons - Number value in Newtons to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const newtonsToUnit = (unit: string, valueInNewtons: number): number => {
    switch (unit) {
        // Return Newtons (N) as is
        case 'Newtons (N)': {
            return valueInNewtons;
        }
        // Convert Newtons (N) to Kilonewtons (kN)
        case 'Kilonewtons (kN)': {
            return valueInNewtons * 0.001;
        }
        // Convert Newtons (N) to Pound-force (lbf)
        case 'Pound-force (lbf)': {
            return valueInNewtons * 0.2248089431;
        }
        // Convert Newtons (N) to Dynes (dyn)
        case 'Dynes (dyn)': {
            return valueInNewtons * 100000;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown force unit');
        }
    }
};

/** Converts force from the specified source unit to Newtons (N)
 * @param unit - Unit Type as String (String)
 * @param value - Number value in the source unit to convert to Newtons (Number)
 * @returns Converted value in Newtons (N) (Number)
 */
const forceToNewtons = (unit: string, value: number): number => {
    switch (unit) {
        // Return Newtons (N) as is
        case 'Newtons (N)': {
            return value;
        }
        // Convert Kilonewtons (kN) to Newtons (N)
        case 'Kilonewtons (kN)': {
            return value * 1000;
        }
        // Convert Pound-force (lbf) to Newtons (N)
        case 'Pound-force (lbf)': {
            return value * 4.4482216153;
        }
        // Convert Dynes (dyn) to Newtons (N)
        case 'Dynes (dyn)': {
            return value * 0.00001;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown force unit');
        }
    }
};

/** Force Unit Conversion Function
 * @param from - Source Unit as String (String)
 * @param to - Destination Unit as String (String)
 * @param value - The Value to be Converted (Number)
 * @returns Converted value in the target unit (Number)
 */
const convertForce = (from: string, to: string, value: number): number => {
    // Convert source unit to Newtons (N)
    const inNewtons = forceToNewtons(from, value);

    // Convert from Newtons (N) to target unit
    const result = newtonsToUnit(to, inNewtons);

    return result;
};

export default convertForce;