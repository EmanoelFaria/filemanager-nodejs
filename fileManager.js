class FileManager {

    constructor(){
        this.fs = require('fs')
    }
    
    deleteFile(path,filename){
        return new Promise((resolve,reject)=>{
            this.fs.unlink(`${path}${filename}`, function(err) {
                if(err && err.code == 'ENOENT')  reject("File doesn't exist, won't remove it.");
                if(err) reject(err)
                resolve(`Arquivo ${filename} deletado com sucesso`)
            });
        })
    }

    listFiles(path){
        return new Promise((resolve,reject)=>{
            this.fs.readdir(`${path}`, (err, files) => {
                if(err) reject(err)
                resolve(files)
              })
        })
    }

    readJSONFile(path){
        return new Promise((resolve,reject)=>{
              this.fs.readFile(path, 'utf8', function (err, data) {
                if (err) reject(err)
                resolve(JSON.parse(data))
              });
        })
    }

    async cleanFolder(path){
        try {
            let files = await this.listFiles(path)
    
            if(files.length <= 0 || !files) return 
    
            for(const file of files){
                let r = await this.deleteFile(path,file)
                console.log(r);
            }
    
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = FileManager
