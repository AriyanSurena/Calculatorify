import Select from "./Select";
interface MenuProps {
   id: string,
   list: string[],
   selected: string,
   setSelected: (selected: string) => void
}

const Menu: React.FC<MenuProps> = (props) => {
   return (
      <Select
         {...props}
      />
   )
}

export default Menu;