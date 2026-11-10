'use strict';
module.exports = { async up(q,S){await q.createTable('categorias',{id:{type:S.INTEGER,autoIncrement:true,primaryKey:true},nombre:{type:S.STRING(80),allowNull:false,unique:true},descripcion:{type:S.STRING(255)}});}, async down(q){await q.dropTable('categorias');} };
