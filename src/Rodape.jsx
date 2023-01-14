import { memo } from "react";
import CheckedInput from "./CheckedInput";

function Rodape(props){
   return(  
    <div className="rodape">
        <CheckedInput  label='Salvar autom.' checked={props.autoSaved} onChange={props.changeAutoSaved}/>

        <button onClick={btnSalvarClick}
         className={"btn-salvar " + (props.isSaved ? 'btn-disabled': '')}>
            Salvar
        </button>

        <div className="legendPage">#SukuaSoft2022</div>
    </div>
   
   );

   function btnSalvarClick(){
    props.saveFun();
   }
}

export default memo(Rodape);