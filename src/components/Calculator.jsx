import { TextField, Button, Paper, Grid, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import React from 'react';

const Buttons = styled(Button)(({ theme }) => ({
    backgroundColor: "#363432",
    color: "white",
    borderRadius: "25px 25px 25px 25px",

}));

const Oper = styled(Button)(({ theme }) => ({
    backgroundColor: "#ffa601",
    color: "white",
    borderRadius: "25px 25px 25px 25px",
    marginLeft: 1
}));

// const styles = theme => ({
//     multilineColor:{
//         color:'red'
//     }
// });

// const Screen = styled(TextField)(({theme}) => ({
//     mt:1,
//     maxWidth:"100%",
//     // color:"red",
//     backgroundColor:"white"
// }));

// const Screen = makeStyles(TextField)(({theme}) => ({
//     screenStyle:{
//         mt:1,
//         maxWidth:"100%",
//         color:"white"
//     }
// }));

const options = {
    shouldForwardProp: (prop) => prop !== 'fontColor',
};

const StyledTextField = styled(
    TextField,
    options,
)(({ fontColor }) => ({
    input: {
        color: fontColor,
    }
}));

const Calculator = () => {

    const [preState, setPreState] = useState("")
    const [curState, setCurState] = useState("")
    const [input, setInput] = useState("0")
    const [operator, setOperator] = useState(null)
    const [total, setTotal] = useState(false)

    const InputNum = (e) => {
        if (curState.includes(".") && e.target.innerText === ".") return;

        if (total) {
            setPreState("");
        }

        curState
            ? setCurState((pre) => pre + e.target.innerText)
            : setCurState(e.target.innerText);
        setTotal(false);
    };

    useEffect(() => {
        setInput(curState);
    }, [curState]);

    useEffect(() => {
        setInput("0");
    }, []);


    const operatorType = (e) => {
        setTotal(false)
        setOperator(e.target.innerText)
        // console.log('pre',preState)
        // console.log('cur',curState)
        if (curState === "") return
        if (preState !== "") {
            equals()
        }
        else {
            setPreState(curState);
            setCurState("");
        }
    };

    const equals = (e) => {
        if (e?.target.innerText === "=") {
            setTotal(true)
        };

        let cal
        switch (operator) {
            case "/":
                cal = String(parseFloat(preState) / parseFloat(curState));
                break;
            case "+":
                cal = String(parseFloat(preState) + parseFloat(curState));
                break;
            case "-":
                cal = String(parseFloat(preState) - parseFloat(curState));
                break;
            case "*":
                cal = String(parseFloat(preState) * parseFloat(curState));
                break;
            default:
                return
        }

        setInput("");
        setPreState(cal);
        setCurState("");
    };


    const percent = () => {
        preState
            ? setCurState(String((parseFloat(curState) / 100) * preState))
            : setCurState(String(parseFloat(curState) / 100));
    };

    const allClear = () => {
        setPreState("");
        setCurState("");
        setInput("0");
    };

    const backspace = () => {
        if(curState ){
            setCurState(curState.slice(0, - 1))
        }
        
    }

    return (
        <React.Fragment>

            <Paper sx={{ height: 300, width: 300, backgroundColor: "black", boxShadow: '7px 7px 5px 0 rgba(50, 50, 50, 0.75)', mx: "auto", mt: 10, }}>
                <Grid container rowSpacing={1} columnSpacing={-4} sx={{ mx: "auto" }}>
                    <Grid item xs={12}>
                        {/* <Screen fullWidth value={input !== "" || input === "0" ?input:preState}></Screen> */}
                        <StyledTextField fullWidth value={input !== "" || input === "0" ? input : preState} fontColor="white" ></StyledTextField>
                    </Grid>

                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>1</Buttons>
                    </Grid>

                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>2</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>3</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Oper onClick={operatorType} color="warning" variant='contained'>/</Oper>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>4</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>5</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>6</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Oper onClick={operatorType} color="warning" variant='contained'>+</Oper>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>7</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>8</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>9</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Oper onClick={operatorType} color="warning" variant='contained'>-</Oper>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>.</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>0</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Buttons onClick={InputNum}>00</Buttons>
                    </Grid>
                    <Grid item xs={3}>
                        <Oper onClick={operatorType} color="warning" variant='contained'>*</Oper>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={allClear} color="inherit" variant='contained' sx={{ borderRadius: "30%" }}>AC</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={backspace} color="inherit" variant='contained' sx={{ borderRadius: "30%" }}>C</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={percent} color="inherit" variant='contained' sx={{ borderRadius: "30%" }}>%</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Oper onClick={equals} color="warning" variant='contained'>=</Oper>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );

}
export default Calculator;