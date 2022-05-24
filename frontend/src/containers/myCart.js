import React, { useState } from 'react';
import './myCart.css';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FLIP_CLICK, CHANGE_NUMBER, REMOVE_ITEM, CHECK_ALL } from '../redux/actionTypes';


export default function Cartpage() {
	//constructor(){
	//	super()
	//	this.state={
	//  dishes:[
	//     {id:1,name:'item1',describe:'description1',price:25,numbers:1,itemclick:true,src:'/apple.jpg'},
	//     {id:2,name:'item2',describe:'description2',price:45,numbers:1,itemclick:true,src:'/banana.jpg'},
	//     {id:3,name:'item3',describe:'descrpition3',price:15,numbers:1,itemclick:true,src:'/mango.jpg'},
	//     {id:4,name:'item4',describe:'descrpition4',price:115,numbers:1,itemclick:true,src:'/orange.png'}],
	//	checkall:true
	//	}
	// }
	const nav = useNavigate();
	const dispatch = useDispatch();
	const dishes = useSelector((state) => state.dishes);
	const loginState = useSelector((state) => state.login);
	const [checkall, setCheckall] = useState('true');

	function check_cart_empyt() {
		var x = true
		const tmp = dishes
		for (var i = 0, len = tmp.length; i < len; i++) {
			if (tmp[i].numbers > 0) {
				x = false;
				break;
			}
		}
		return x
	}

	function check_all_select() {
		var x = true
		const tmp = dishes
		for (var i = 0, len = tmp.length; i < len; i++) {
			if (tmp[i].numbers > 0) {
				if (tmp[i].itemclick === false) {
					x = false;
					break;
				}
			}
		}
		return x
	}

	const clickItem = (item, index) => {
		dispatch({ type: FLIP_CLICK, payload: index })
	}

	const changeNumber = (index, count) => {
		//const tmp=this.state.dishes
		//tmp[index].numbers+=count
		//this.setState({dishes:tmp})
		dispatch({ type: CHANGE_NUMBER, payload: { id: index, count: count } })
	}

	const removeItem = (index) => {
		//var tmp=this.state.dishes
		//tmp=tmp.filter((item,index_)=>index !=index_)
		//this.setState({dishes:tmp})
		dispatch({ type: REMOVE_ITEM, payload: index })

		var x = true
		const tmp2 = dishes
		for (var i = 0, len = tmp2.length; i < len; i++) {
			if (tmp2[i].itemclick === false) {
				x = false;
				break;
			}
		}
		setCheckall(x)
	}

	const getTotalPrice = () => {
		const tmp = dishes
		var value = 0
		for (var i = 0, len = tmp.length; i < len; i++) {
			if (tmp[i].itemclick === true) {
				value += tmp[i].numbers * tmp[i].price
			}
		}
		return value
	}

	const SelectAll = () => {
		if (checkall === false) {
			setCheckall(true)

			//const tmp=dishes
			//for(var i=0,len=tmp.length;i<len;i++)
			//{
			//	tmp[i].itemclick=true
			//}
			//this.setState({dishes:tmp})
			dispatch({ type: CHECK_ALL, payload: true })
		}
		else {
			setCheckall(false)

			//const tmp=this.state.dishes
			//for(var i=0,len=tmp.length;i<len;i++)
			//{
			//	tmp[i].itemclick=false
			//}
			//this.setState({dishes:tmp})
			dispatch({ type: CHECK_ALL, payload: false })
		}
	}

	if (!loginState) {
		return <h2>Please login!</h2>
	}

	if (check_cart_empyt() === true) {
		return <h2>The cart is empty!</h2>
	}

	else {
		return (
			<div className='Cart'>

				<div className='header'>
					<div>shoppingcart</div>
				</div>


				<div className='itemlist'>
					{
						dishes.map((item, index) => (
							item.numbers > 0 &&
							<div className='item_content'>
								<div className='item_content_check' onClick={() => clickItem(item, index)}>
									{
										item.itemclick ? <img src={require('./assets/shopping_check.png')} alt="" /> : <img src={require('./assets/shopping_checkNormal.png')} alt="" />
									}
								</div>

								<div className='item_pic'>
									<img src={item.src} alt='' />
								</div>

								<div className='item_detail'>
									<div className='item_title'>{item.name}</div>
									<div className='item_description'>{item.description}</div>
									<div className='item_action'>
										<div className='item_price'>${item.price}</div>
										<div className='item_operation'>
											<button className='numberChangeButton' onClick={() => changeNumber(index, -1)} disabled={item.numbers === 1}>-</button>
											<div className='item_numbers'>{item.numbers}</div>
											<button className='numberChangeButton' onClick={() => changeNumber(index, 1)}>+</button>
											<button className='removeButton' onClick={() => removeItem(index)}>delete</button>
										</div>
									</div>
								</div>
							</div>
						))
					}
				</div>



				<div className='CartBelow'>
					<div className='belowAction'>
						<div className='checkAllButton' onClick={() => SelectAll()}>
							{
								check_all_select() === true ? <img src={require('./assets/shopping_check.png')} alt="" /> : <img src={require('./assets/shopping_checkNormal.png')} alt="" />
							}
							select all
						</div>
						<div className='belowTotal'>
							Total price : ${getTotalPrice()}
						</div>
					</div>
					<div className='checkOutButton' onClick={() => nav('/checkoutinfo')}>check out</div>
				</div>

			</div>
		)
	}

	/*
	renderDishes(){
	return(
	<div className='Cart'>
	
	<div className='header'>
	 <div>shoppingcart</div>
	</div>
	
	
	<div className='itemlist'>
	{
		dishes.map((item,index)=>(
			<div className='item_content'>
			<div className='item_content_check' onClick={clickItem(item)}>
			{
				item.itemclick ? <img src={require('./assets/shopping_check.png')} alt=""/> : <img src={require('./assets/shopping_checkNormal.png')} alt=""/>
			}
			</div>
			
			<div className='item_pic'>
			<img src={require('./assets'+item.src)} alt='' />
			</div>
			
			<div className='item_detail'>
			<div className='item_title'>{item.name}</div>
			<div className='item_description'>{item.describe}</div>
			<div className='item_action'>
			<div className='item_price'>${item.price}</div>
			<div className='item_operation'>
			<button className='numberChangeButton' onClick={changeNumber(item,-1)} disabled={item.numbers==1}>-</button>
			<div className='item_numbers'>{item.numbers}</div>
			<button className='numberChangeButton' onClick={changeNumber(item,1)}>+</button>
			<button className='removeButton' onClick={removeItem(item)}>delete</button>
			</div>
			</div>
			</div>
			</div>
		))
	}
	</div>
	
	
	
	<div className='CartBelow'>
	<div className='belowAction'>
	 <div className='checkAllButton' onClick={SelectAll()}>
		{
		checkall ? <img src={require('./assets/shopping_check.png')} alt=""/> : <img src={require('./assets/shopping_checkNormal.png')} alt=""/>
		}
		select all
	 </div>
	 <div className='belowTotal'>
	 Total price : ${getTotalPrice()}
	 </div>
	</div>
	<div className='checkOutButton'>check out</div>
	</div>
	
	</div>
	)
	}
	
	
	renderNone(){
		return <h2>The cart is empty!</h2>
	}
	
	render(){
		const  tmp=this.state.dishes
		return tmp.length ==0 ? this.renderNone():this.renderDishes()
	}
	*/

}

