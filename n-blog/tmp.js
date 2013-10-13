Post.getOneArticle = function(post_id, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //查询post集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                "_id": new ObjectID(post_id)
            }, function(err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                if (doc) { //表示查询post成功
                    doc.post = markdown.toHTML(doc.post); //解析 markdown 为 html

                    //查询post成功后再查询comment集合
                    db.collection('comments', function(err, collection) {
                        if (err) {
                            mongodb.close();
                            return callback(err);
                        }
                        collection.find({
                            "post_id": post_id
                        }).sort({
                            time: -1
                        }).toArray(function(err, docs) {
                            mongodb.close();
                            if (err) {
                                return callback(err);
                            }
                            if (docs) {
                                docs.forEach(function(doc) { //解析 markdown 为 html
                                    doc.content = markdown.toHTML(doc.content);
                                });
                            }
                            //这个doc是指的post
                            //然后将doc跟你查询出来的docs（comments）合并起来
                            //一次callback只能返回一个对象
                            var doc_tmp = doc; //起示例作用，具体如何合并对象根据自己需要更改
                            callback(null, doc); //返回评论
                        });
                    });
                }
            });
        });
    });
};