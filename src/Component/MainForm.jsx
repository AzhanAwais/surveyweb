import React, { useState,useRef } from 'react';
import '../style/style.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddIcon from '@material-ui/icons/Add';
import ShortTextIcon from '@material-ui/icons/ShortText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RemoveIcon from '@material-ui/icons/Remove';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import ImageIcon from '@material-ui/icons/Image';

const MainForm = ()=> {

  const formTitle = useRef('');
  const formDiscription = useRef('');
  
  const [questionArr, setQuestionArr] = useState([
    {
      Question:'',
      Qtype:'short',
      Options:['']
    },
  ]);

 
  const handleInputChange = ((index,event)=>{
    var data = [...questionArr];
    data[index][event.target.name] = event.target.value;
    setQuestionArr(data)
  });

  const handleInputOptions = ((index,i,event)=>{
    var data = [...questionArr];
    data[index].Options[i] = event.target.value;
    setQuestionArr(data);
  });

  const handleAddOptions = ((index,event)=>{
    event.preventDefault();
    var data = [...questionArr];
    data[index].Options.push('');
    setQuestionArr(data);
  });

  const handleDeleteOptions = ((index,i,event)=>{
    event.preventDefault();
    var data = [...questionArr];
    data[index].Options.splice(i,1);
    setQuestionArr(data);
  });

  const deleteQuestion = ((index,event)=>{
    event.preventDefault();
    var data = [...questionArr];
    data.splice(index,1)
    setQuestionArr(data);
  })

  const copyQuestion = ((index,event)=>{
    event.preventDefault();
    setQuestionArr([
      ...questionArr,
      {
        Question:questionArr[index].Question,
        Qtype:questionArr[index].Qtype,
        Options:questionArr[index].Options
      }
    ])
  })

  const addQuestion = (event)=>{
    event.preventDefault();
    setQuestionArr([
      ...questionArr,
      {
        Question:'',
        Qtype:'short',
        Options:['']
      }
    ])
  }

  console.log(questionArr)


  return(
    <form action="" className="mb-5">
      <div className="container my-form mt-3">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="header py-4 px-4">
              <input ref={formTitle} required className="title w-100 mb-3 py-2" placeholder="Form Title" type="text"/>
              <textarea ref={formDiscription} required className="discription w-100" placeholder="Form discription" type="text"></textarea>
            </div>
          </div>
          {
            questionArr.map((values,index)=>(
              <div className="col-md-10 col-lg-8 mt-4" key={index}>
                <div className="footer py-4 px-4">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="question-area">
                            <div className="question">
                              <input value={values.Question} onChange={event=>handleInputChange(index,event)} required className="w-100 py-2" name="Question" placeholder="Question" type="text" name="Question" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4 mt-2 mb-4">
                          <div className="selection-area">
                            <select className="w-100 p-2" value={values.Qtype} name="Qtype" onChange={event=>handleInputChange(index,event)}>
                              <option value="short">Short Quesion</option>
                              <option value="multiple">Multiple Choice</option>
                              <option value="single">Single Choise</option>
                            </select>
                          </div>
                        </div>

                        {
                          (values.Qtype==='short') &&
                            <div className="col-12 mb-3" key={index}>
                              <div className="row">
                                <div className="col-1">
                                  <ShortTextIcon />
                                </div>
                                    
                                <div className="col-7">
                                  <input readOnly className="w-100 options pb-1" placeholder="Short Question" type="text" name="shortQ" />
                                </div>
                              </div>
                            </div>
                        }

                        {
                          (values.Qtype==='multiple')&&
                          values.Options.map((v,i)=>(
                            <div className="col-12 mb-3" key={i}>
                              <div className="row">
                                <div className="col-1">
                                  <CheckBoxIcon />
                                </div>
                                    
                                <div className="col-7">
                                  <input onChange={event=>handleInputOptions(index,i,event)} className="w-100 options pb-1" value={v} placeholder="Option" type="text" name="option" />
                                </div>
                                
                                <div className="col-4">
                                  <button onClick={event=> handleAddOptions(index,event)}><AddIcon className="mr-3 add-opt" /></button>
                                  {
                                    !(i<1) &&
                                    <button><RemoveIcon onClick={event=> handleDeleteOptions(index,i,event)} className="remove-opt" /></button>
                                  }
                                </div>
                              </div>
                            </div>
                          ))
                        }

                        {
                          (values.Qtype==='single')&&
                          values.Options.map((v,i)=>(
                            <div className="col-12 mb-3" key={i}>
                              <div className="row">
                                <div className="col-1">
                                  <RadioButtonCheckedIcon />
                                </div>
                                    
                                <div className="col-7">
                                  <input onChange={event=>handleInputOptions(index,i,event)} className="w-100 options pb-1" value={v} placeholder="Option" type="text" name="option" />
                                </div>
                                
                                <div className="col-4">
                                  <button onClick={event=> handleAddOptions(index,event)}><AddIcon className="mr-3 add-opt" /></button>
                                  {
                                    !(i<1) &&
                                    <button><RemoveIcon onClick={event=> handleDeleteOptions(index,i,event)} className="remove-opt" /></button>
                                  }
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        
                        <div className='col-12 text-right'>
                          <button className="border-right px-2" onClick={event=> deleteQuestion(index,event)}><DeleteOutlineIcon className="btn-del" /></button>
                          <button className="px-3" onClick={event=> copyQuestion(index,event)}><FilterNoneIcon className="btn-copy" /></button>
                        </div>
                      </div>        
                    </div> 
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className="row">
          <div className="offset-10 offset-sm-10">
            <button onClick={event=> addQuestion(event)} className="add-question ml-auto mt-3"><AddCircleIcon className="btn-add" /></button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-sm-3 col-md-2 offset-md-1 col-lg-2 offset-lg-2">
            <button className="send w-100 py-2">SEND</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MainForm;