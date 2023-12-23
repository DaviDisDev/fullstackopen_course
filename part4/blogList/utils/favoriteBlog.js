const favoriteBlog = (blogs) => {
//cosas
        let arrayLikes=[];
        blogs.forEach(blog => {
            arrayLikes.push(blog.likes)
        });
        return Math.max(...arrayLikes)
   }
   
   module.exports = {
    favoriteBlog
   }