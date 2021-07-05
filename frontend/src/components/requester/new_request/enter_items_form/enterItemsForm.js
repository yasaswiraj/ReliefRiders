//React
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

//CSS
import InputField from '../../../global_ui/input';
import Navbar from '../../../global_ui/nav';
import restyles from './requestItem.module.css';
import { useSessionStorageState } from "../../../../utils/useLocalStorageState";

function EnterItemsForm() {
	const [err, setErr] = useState({
        name:null,
		check: null,
        qt:null,
		showErrors:false
    })
	const history = useHistory();
	const [inputList, setInputList] = useState([{itemName: "", itemQty: ""}]);
	
	useEffect( () => {
		const items = localStorage.getItem("items")
		if (items){
			setInputList(JSON.parse(items))
		}
	},[])

	useEffect( () => {
		localStorage.setItem("items",JSON.stringify(inputList))		
	},[inputList])

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		if(name==="itemName"){
			if(value===""){
				setErr({...err,name: "Enter item name"})
			}
			else if(value.length<3){
				setErr({...err,name: "Name should be atleast 3 characters"})
			}
			else{
				setErr({...err,name: ""})
			}
		}
		else{
			if(value===""){
				setErr({...err,qt: "Enter item quantity"})
			}
			else{
				setErr({...err,qt: ""})
			}
		}
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleAddClick = () => {
		console.log(err)
		if(err.name===null){
			if(err.qt===null){
				setErr({
					...err,
					qt:"Empty Field",
					name:"Empty Field"
				})
			}
			else{
				setErr({
					...err,
					qt:"Empty Field"
				})
			}
		}
		else{
			if(err.qt===null){
				setErr({
					...err,
					qt:"Empty Field"
				})
			}
			else if(err.name.length===0 && err.qt.length===0){
				setInputList([...inputList, { itemName: "", itemQty: "" }]);
				setErr({
					...err,
					name:null,
					qty:null
				})
			}
		}
	};

	const [Medicine, setMedicine] = useState(sessionStorage.getItem('Medicine')==='true');
	const [Grocery, setGrocery] = useState(sessionStorage.getItem('Grocery')==='true');
	const [Misc,setMisc] = useState(sessionStorage.getItem('Misc')==='true');
	const [categories,setcategories] = useSessionStorageState("tags",[]);

	const OnCheckBox = (e)=>
	{
		if(e.target.name === "Medicine"){
			sessionStorage.setItem('Medicine',`${e.target.checked}`);
			setMedicine(e.target.checked); 

			if(e.target.checked === true){                    
				setcategories( categories=>[...categories,"MEDICINES"]);
			}
			else{
				let displayItems = JSON.parse(sessionStorage.getItem("tags"));
				displayItems = displayItems.filter(e => e !== "MEDICINES");
				setcategories([...displayItems])
				sessionStorage.setItem("tags",JSON.stringify(displayItems))
			}
		}

		if(e.target.name === "Grocery"){
			sessionStorage.setItem('Grocery',`${e.target.checked}`);
			setGrocery(e.target.checked); 

			if(e.target.checked === true){
				setcategories( categories=>[...categories,"GROCERY"]);
			}
			
			else{
				let displayItems = JSON.parse(sessionStorage.getItem("tags"));
				displayItems = displayItems.filter(e => e !== "GROCERY");
				setcategories([...displayItems])
				sessionStorage.setItem("tags",JSON.stringify(displayItems))
			}
		}

		if(e.target.name === "Misc"){
			sessionStorage.setItem('Misc',`${e.target.checked}`);
			setMisc(e.target.checked); 

			if(e.target.checked === true){                     
				setcategories( categories=>[...categories,"MISC."]);
			}
			else{
				let displayItems = JSON.parse(sessionStorage.getItem("tags"));
				displayItems = displayItems.filter(e => e !== "MISC.");
				setcategories([...displayItems])
				sessionStorage.setItem("tags",JSON.stringify(displayItems))
			}
		}
	}

	const onCancel = ()=>{
		history.push('/');
	}

	const onSubmit = (e) =>{
		e.preventDefault();
		if(inputList.length>0){
			if(categories.length!=0){
					setErr({
						...err,
						check:""
					})
					history.push('/address');
				}
				else{
					setErr({
						...err,
						check:"Select the categories"
					})
				}
			}
			else{
				setErr({
					...err,
					check:"Enter atleast a single item"
				})
			}
	}

	return (
		<div>
 		{/* Navbar */}
		 
		<Navbar back='/list_type' backStyle={{ color: "white" }} title="Enter Items" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
		
		<div className={restyles.container}>
			{/* Prompt Text */}
				<div className={restyles.rmessage}>
					<p style={{fontWeight: 'bold'}}>Please choose the items you want to request</p>
				</div>
				

			<div style={{marginTop: '5%'}} className={restyles.rlistname}>
				<div className={restyles.row}>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>item name</p>
					</div>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>strips/qty</p>
					</div>
					<div className={restyles.col}>
						<p style={{fontWeight: 'bold'}}>Add/Delete</p>
					</div>
				</div>

				<div className={restyles.container}>
					{inputList.map((x, i) => {
						return (
							<div key={inputList.id}>
								<div className={restyles.row} style={{marginTop: '2%'}}>
									<div className={restyles.col1}>
										<InputField type="text" placeholder="Item Name..." name="itemName" value={x.itemName} onChange={e => handleInputChange(e, i)} error={err.name}/>
									</div>
									<div className={restyles.col1}>
										<InputField type="text" placeholder="Item qty..." name="itemQty" value={x.itemQty} onChange={e => handleInputChange(e, i)} error={err.qt}/>
									</div>
									<div className={restyles.col1}>
										{inputList.length - 1 === i && <button style={{marginRight: '2%', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} type="button" className={restyles.btn} onClick={handleAddClick} value="Add">Add</button>}
										{inputList.length !== 1 && <button style={{marginLeft: '1%', backgroundColor: 'red', color: 'white', fontWeight: 'bold'}} type="button" className={restyles.btn} onClick={() => handleRemoveClick(i)} >X</button>}
									</div>
								</div>
							</div>
						)
					})}
				</div>

				<div className={restyles.up_list} style={{marginTop: '5%'}}>
					<div className={restyles.up_list}> 
						<div>
							<label className={restyles.up_check_label}>Medicine
								<input type="checkbox" name="Medicine" checked={Medicine} onChange = {OnCheckBox} />
								<span className={`${restyles.up_check} ${restyles.check_1}`}></span>
							</label>
						</div>
						<div> 
							<label className={restyles.up_check_label}>Grocery
								<input type="checkbox" name="Grocery" checked={Grocery} onChange = {OnCheckBox} />
								<span className={`${restyles.up_check} ${restyles.check_2}`}></span>
							</label>
						</div>
						<div> 
							<label className={restyles.up_check_label}>Misc.
								<input type="checkbox" name="Misc" checked={Misc} onChange = {OnCheckBox}/>
								<span className={`${restyles.up_check} ${restyles.check_3}`}></span>
							</label>
						</div>
					</div>
				</div>

				<p className={restyles.up_error_msg}>{err.check ? err.check : ""}</p>

				<div className={restyles.container}>
					<div className={restyles.row} style={{marginTop: '10%', marginBottom: '2%'}}>
					<div className={restyles.col} onClick={onCancel}>
							<button type="button" style={{backgroundColor: 'red', color: 'white'}} className={restyles.btn}>Cancel</button>
						</div>
						<div className={restyles.col} onClick={onSubmit}>
							<button type="button" style={{backgroundColor: 'green', color: 'white'}} className={restyles.btn}>Proceed</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default EnterItemsForm;
