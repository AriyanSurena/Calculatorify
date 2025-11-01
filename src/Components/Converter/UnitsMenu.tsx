import { type Dispatch, type SetStateAction } from "react";
import SelectMenu from "./SelectMenu";

/**
 * Props for the UnitsMenu component.
 *
 * This component provides a dropdown menu for selecting a **measurement unit**
 * (e.g., kg, L, pcs). It is a thin, semantic wrapper around the generic
 * `SelectMenu` component, giving the selection a clear domain-specific meaning.
 */
interface UnitsMenuProps {
    /**
   * Unique identifier for the dropdown element.
   * Passed directly to `SelectMenu` and required for accessibility and testing.
   */
    id: string,

    /**
       * Array of available unit options that the user can choose from.
       *
       * @example
       * ["kg", "g", "L", "mL", "pcs"]
       */
    unitTypesList: string[],

    /**
       * Setter function (from `useState`) that updates the selected unit in the parent.
       */
    setSelectedUnitType: Dispatch<SetStateAction<string>>

    /**
       * The currently selected unit value.
       * This is the controlled `value` of the underlying `SelectMenu`.
       */
    selectedUnitType: string,
}
/**
 * UnitsMenu
 *
 * A specialized dropdown for **selecting a measurement unit** in forms or input sections.
 * It re-uses the generic `SelectMenu` to avoid code duplication while keeping a clear,
 * domain-specific API for unit selection.
 *
 * @param props - Component props (see {@link UnitsMenuProps})
 * @returns A `SelectMenu` pre-configured with the provided unit list and state.
 *
 * @example
 * ```tsx
 * const [unit, setUnit] = useState("kg");
 *
 * <UnitsMenu
 *   id="unit-selector"
 *   unitTypesList={["kg", "g", "L"]}
 *   selectedUnitType={unit}
 *   setSelectedUnitType={setUnit}
 * />
 * ```
 */
const UnitsMenu: React.FC<UnitsMenuProps> = ({ id, unitTypesList, setSelectedUnitType, selectedUnitType }) => {
    return (
        <SelectMenu id={id} list={unitTypesList} value={selectedUnitType} setValue={setSelectedUnitType} />
    )
}

export default UnitsMenu;