import classes from './MyInput.module.scss'

export const MyInput = (props) => {
    return (
        <input className={classes.myInput} {...props}></input>
    )
}