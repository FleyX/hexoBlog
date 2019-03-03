import * as childPrecess from 'child_process';

class ProcessHelper {
    static exec(cmd) {
        return new Promise((resolve, reject) => {
            childPrecess.exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        stdout,
                        stderr
                    })
                }
            })
        })
    }
}

// (async()=>{
//     let res= await ProcessHelper.exec('cd /d e://workspace&&dir');
//     console.log(res);
// })()

export default ProcessHelper