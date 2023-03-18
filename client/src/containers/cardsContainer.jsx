import React from "react";
import Cards from '../pages/associationsCards';
import {connect} from 'react-redux';

const mapStateToProps=state=>{
    data:state.Cards.no;
}

const mapDispatchToProps=dispatch=>{

}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);