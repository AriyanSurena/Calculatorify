/**
 * Convert bytes to bits.
 * @param value Byte value (Number)
 * @returns Bits value (Number)
 */
const bytesToBits = (value: number): number => {
    return value * 8; // Each byte is 8 bits.
};

/**
 * Convert bits to bytes.
 * @param value Bits value (Number)
 * @returns Bytes value (Number)
 */
const bitsToBytes = (value: number): number => {
    return value / 8; // 8 bits is 1 byte.
};

/**
 * Convert input unit to bytes.
 * @param unit Input unit (String)
 * @param value Input value (Number)
 * @returns Byte value (Number)
 */
const dataSizeToBytes = (unit: string, value: number): number => {
    switch (unit) {
        // If input unit is byte, return byte value
        case 'Bytes (B)': {
            return value;
        }
        // Convert Kilobytes (KB) to Bytes
        case 'Kilobytes (KB)': {
            return value * 1024;
        }
        // Convert Megabytes (MB) to Bytes
        case 'Megabytes (MB)': {
            return value * 1024 * 1024;
        }
        // Convert Gigabytes (GB) to Bytes
        case 'Gigabytes (GB)': {
            return value * 1024 * 1024 * 1024;
        }
        // Convert Terabytes (TB) to Bytes
        case 'Terabytes (TB)': {
            return value * 1024 * 1024 * 1024 * 1024;
        }
        // Convert Petabytes (PB) to Bytes
        case 'Petabytes (PB)': {
            return value * 1024 * 1024 * 1024 * 1024 * 1024;
        }
        // Convert Bits (bit) to Bytes
        case 'Bits (bit)': {
            return bitsToBytes(value);
        }
        // Convert Kilobits (Kb) to Bytes
        case 'Kilobits (Kb)': {
            return bitsToBytes(value * 1024);
        }
        // Convert Megabits (Mb) to Bytes
        case 'Megabits (Mb)': {
            return bitsToBytes(value * 1024 * 1024);
        }
        // If value or unit is invalid
        default: {
            throw new Error('Unknown input data size unit');
        }
    }
};

/**
 * Convert Bytes to Destination Unit
 * @param unit Destination Unit (String)
 * @param valueInBytes Byte value (Number)
 * @returns Destination Value (Number)
 */
const bytesToUnit = (unit: string, valueInBytes: number): number => {
    switch (unit) {
        // If destination unit is byte, return byte value
        case 'Bytes (B)': {
            return valueInBytes;
        }
        // Convert Bytes to Kilobytes (KB)
        case 'Kilobytes (KB)': {
            return valueInBytes / 1024;
        }
        // Convert Bytes to Megabytes (MB)
        case 'Megabytes (MB)': {
            return valueInBytes / (1024 * 1024);
        }
        // Convert Bytes to Gigabytes (GB)
        case 'Gigabytes (GB)': {
            return valueInBytes / (1024 * 1024 * 1024);
        }
        // Convert Bytes to Terabytes (TB)
        case 'Terabytes (TB)': {
            return valueInBytes / (1024 * 1024 * 1024 * 1024);
        }
        // Convert Bytes to Petabytes (PB)
        case 'Petabytes (PB)': {
            return valueInBytes / (1024 * 1024 * 1024 * 1024 * 1024);
        }
        // Convert Bytes to Bits (bit)
        case 'Bits (bit)': {
            return bytesToBits(valueInBytes);
        }
        // Convert Bytes to Kilobits (Kb)
        case 'Kilobits (Kb)': {
            return bytesToBits(valueInBytes) / 1024;
        }
        // Convert Bytes to Megabits (Mb)
        case 'Megabits (Mb)': {
            return bytesToBits(valueInBytes) / (1024 * 1024);
        }
        // If destination value or unit is invalid
        default: {
            throw new Error('Unknown destination unit or value');
        }
    }
};

/**
 * Data Unit Conversion Function
 * @param from Source Unit (String)
 * @param to Destination Unit (String)
 * @param value The Value to be Converted (Number)
 * @returns Returns the Result of the Conversion of Units of Data (Number)
 */
const convertDataSize = (from: string, to: string, value: number): number => {
    // Convert to Bytes (B)
    const inBytes = dataSizeToBytes(from, value);

    // Convert to Destination Unit
    const result = bytesToUnit(to, inBytes);

    return result;
};

export default convertDataSize;