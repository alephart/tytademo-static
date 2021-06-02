import React from 'react'
import Button from '@material-ui/core/Button'

const Loading = () => {
    return (
        <div className="loading">
            <div>
                <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                <div className="percentageVideo">
                    <div className="boxPercentage">
                        <div className="iconPercentage"></div>
                        <div className="numberPercentage">
                            50%
                        </div>
                        <div className="linePercentage">
                            <div className="percentage" style={{width: 50}}></div>
                        </div>
                        <div className="timePercentage">
                            Por segundo
                        </div>
                        <div className="secondPercentage">
                            000 000 166
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Loading