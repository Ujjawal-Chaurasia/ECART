class Apifeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword?{

            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },

        }:{}
        // console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy={...this.queryStr}    // we are storing a copy else original query will get modified
        // console.log(querycopy);

        //removing some fields for category
        const   removeFields=["keyword","page","limit"];
        removeFields.forEach(key=> delete querycopy[key]);
        // console.log(querycopy);

        //filter for pricing and rating 
        let queryStr = JSON.stringify(querycopy);    //changing to string 
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);


        // this.query=this.query.find(querycopy);
        this.query=this.query.find(JSON.parse(queryStr));     //changing to object again using json.parse
        return this;
    }

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports=Apifeatures