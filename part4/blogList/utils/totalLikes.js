const totalLikes = (blogs) => {
   let total=0;
   if (blogs.length===1){
    total=blogs[0].likes
   }else{
     blogs.forEach(blog => {
        total+=blog.likes
    });
   }
   
    return total;
  }
  
  module.exports = {
    totalLikes
  }