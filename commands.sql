Tehtävä 13.2
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
	url text NOT NULL,
	title text NOT NULL, 
    likes integer DEFAULT 0
);
insert into blogs (author,url,title) values ('author1','http://google.fi','title1');
insert into blogs (author,url,title) values ('author2','http://google.fi','title2');
insert into blogs (author,url,title) values ('author3','http://google.fi','title3');



