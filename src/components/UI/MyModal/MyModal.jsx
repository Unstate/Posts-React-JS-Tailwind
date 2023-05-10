import { PostForm } from '../../PostForm'
import classes from './MyModal.module.scss'

export const MyModal = ({children, visible, setVisible}) => {
    
    const rootClasses = [classes.myModal]

    if (visible) {
        rootClasses.push(classes.active)
    }
    
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}> 
                {children} 
            </div>
        </div>
    )
}