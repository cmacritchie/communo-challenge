import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default ({ children, id, index }) => {
    return (
       
                <div className="row">
                    <div className="col s12 m7">
                        <div className="card">
                            {/* <div class="card-image">
                                <img src="images/sample-1.jpg">
                                <span class="card-title">Card Title</span>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                            </div> */}
                            <div className="card-content">
                            {children}
                            </div>
                        </div>
                    </div>
                </div>
            
        
    )
}