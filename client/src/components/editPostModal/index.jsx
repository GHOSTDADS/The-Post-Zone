import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_POST } from '../../utils/mutations';
import React from 'react';

const EditModal = (props) => {

    const [open, setOpen] = useState(false);
    const active = open ? "is-active" : "";
    const [formState, setFormState] = useState({ value: '' });
    const [editPost, { error }] = useMutation(EDIT_POST);

    useEffect(() => {
        setOpen(props.open);
        setFormState({ value: props.body });
    }, [props])


    const handleModalClick = () => {
        setFormState({ value: '' });
        setOpen(!open)
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setFormState({
            ...formState,
            value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await editPost({
                variables: { id: props.modalData, body: formState.value, },
            },
            { returnNewDocument: true }
            );
            setFormState({ value: '' });
            setOpen(!open);
        } catch (e) {
            console.log(e);
        }

    };

    return (
        <div className={`modal ${active}`}>
            <div className='modal-content'>
                <form className="box" onSubmit={handleFormSubmit}>
                    <button type='button' className="delete" aria-label="close" onClick={handleModalClick}></button>
                    <div className='modal-card-title has-text-centered'>
                        <div className='title is-1'>Edit your Post!</div>
                        <div>What did you actually mean to say?</div>
                    </div>
                    <div className="field has-text-centered is-offset-2 column is-8">
                        <div className="control">
                            <textarea key={`${props.modalData}`} className="textarea is-medium is-warning has-fixed-size" defaultValue={props.body} name='body' type="text"  id="body" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="field has-text-centered is-offset-2 column is-8">
                        <div className="control">
                            <button className="submit button is-warning">Edit!</button>
                        </div>
                    </div>



                </form>

            </div>
        </div>
    )
};

export default EditModal;