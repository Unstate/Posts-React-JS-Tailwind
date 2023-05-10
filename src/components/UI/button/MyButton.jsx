import classes from './MyButton.module.scss'

export const MyButton = ({children,...props}) => {
    // debugger
    return (
        <button {...props} className={classes.myButton}>
            {children}
        </button>
    )
}