import SelectMenu from "./SelectMenu";

interface UnitSelectorsProps {
    id: string,
    unitsCategory: {
        Area: string[];
        Length: string[];
        Temperature: string[];
        Volume: string[];
        Mass: string[];
        Data: string[];
        Speed: string[];
        Time: string[];
        [key: string]: any[];
    },
    selectedUnitType: string,
    unit: string,
    setUnit: (unit: string) => void,
}
const UnitSelectors2: React.FC<UnitSelectorsProps> = ({ id, unitsCategory, selectedUnitType, unit , setUnit }) => {
    return (
        <SelectMenu id={id} list={unitsCategory[selectedUnitType]} value={unit} setValue={setUnit} />
    )
}

export default UnitSelectors2;