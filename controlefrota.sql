drop database db_controle_frota;

create database db_controle_frota;

use db_controle_frota;


create table users
(
	id_usuario int not null auto_increment primary key,
    nm_usuario varchar(255) not null,
    nm_sobrenome varchar(255) not null,
    cd_cpf varchar(15) not null,
    cd_rg varchar(15) not null,
    nr_telefone int not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created varchar(255) not null
);


create table tb_empresa
(
    id_empresa int not null auto_increment primary key,
    nm_empresa varchar(255) not null,
    cd_cnpj int not null,
    ds_email varchar(255) not null,
    ds_endereco varchar (255) not null,
    sg_estado char(2) not null,
    num_endereco varchar(255) not null,
    ds_complemento varchar(255),
    cd_CEP int not null, 
    nm_cidade varchar(255) not null,
    nr_telefone varchar(11) not null,
    nr_celular varchar(11) not null,
    nm_responsavel varchar(255) not null,
    dt_validadecontrato date,
    ds_status varchar(20) not null
);
select * from tb_frota;
select * from tb_motorista;
insert tb_empresa(nm_empresa, cd_cnpj, ds_email, ds_endereco, sg_estado, num_endereco, nm_cidade, nr_telefone, nm_responsavel, cd_CEP, nr_celular, qt_veiculos) values ("NET", 11133434, "adenilson@net.com", "Av. Conselheiro Nébias", "SP", 555, "Santos", "139816544", "Adenilson", 11088310, "112231312", 100);

create table tb_veiculo
(
    id_veiculo int not null auto_increment primary key,
    id_marca int not null,
    id_modelo int not null,
    ds_proprietario varchar(20),
    id_empresa int,
    qt_cilindrada int not null,
    qt_ano int not null,
    ds_cor varchar(25) not null, 
    qt_quilometragem int not null,
    qt_passageiros int not null, 
	qt_peso int not null, 
    ds_placa varchar(8) not null, 
    nr_renavam varchar(25) not null,
    ds_status varchar(25) not null,
    id_frota int not null,
    id_seguro int
);



create table tb_veic(
	    id int not null auto_increment primary key,
    ds_proprietario varchar(20),
    id_empresa int,
    qt_cilindrada int not null,
    qt_ano int not null,
    ds_cor varchar(25) not null, 
    qt_quilometragem int not null,
    qt_passageiros int not null, 
	qt_peso int not null, 
    ds_placa varchar(8) not null, 
    nr_renavam varchar(25) not null,
    ds_status varchar(25) not null,
    id_frota int not null,
    id_seguro int
    
);

create table tb_locacao
(
	id_locacao int not null auto_increment primary key,
    id_empresa int not null,
    id_frota int not null,
    id_veiculo int not null
);

create table tb_motorista
(
    id_motorista int not null auto_increment primary key,
    nm_motorista varchar(255) not null,
    sobrenome_motorista varchar(255) not null,
    cd_cnh char(11) not null,
    cd_cpf char(11) not null,
    password varchar(255) not null,
    cd_rg varchar(14) not null,
    nr_telefone varchar(11),
    nr_celular varchar(11) not null,
    cat_cnh varchar(2) not null, 
    foto_motorista varchar(255),
    cd_cep int,
    ds_endereco varchar (255) not null,
    sg_estado char(2) not null,
    num_endereco varchar(255) not null,
    nm_cidade varchar(255) not null,
    ds_email varchar(255) not null,
    id_empresa int
);


create table tb_viagem
(
    id_viagem int not null auto_increment primary key,
    end_origem varchar(255) not null,
    cidade_origem varchar(255) not null,
    data_saida datetime,
    end_destino varchar(255) not null,
    cidade_destino varchar(255) not null,
    data_chegada datetime,
    km int not null,
    id_veiculo int,
    id_empresa int,
    id_motorista int,
    dt_iniciada datetime,
    dt_finalizada datetime
);


create table teste(
	id int not null auto_increment primary key,
    person_name varchar(20),
    business_name varchar(20),
    business_gst_number int
    );
    
create table tb_produto
(
    id_produto int not null auto_increment primary key,
    nome_produto varchar(255) not null,
    descricao_produto varchar(255) not null,
    valor_produto int not null,
    categoria varchar(255) not null,
    qt_total int not null,
    qt_produto int not null,
    id_empresa int not null
);



create table tb_abastecimento
(
    id_abastecimento int not null auto_increment primary key,
    nome_posto varchar(255) not null,
    endereco_posto varchar(255) not null,
    abast_litros int not null,
    valor_abastecido int not null,
    id_veiculo int
);



create table tb_estacionamento
(
    id_estacionamento int not null auto_increment primary key,
    nome_estac varchar(255) not null,
    endereco varchar(255) not null,
    cidade varchar(255) not null,
    bairro varchar(255) not null,
    tempo int not null,
    id_veiculo int
);


create table tb_manutencao
(
    id_manutencao int not null auto_increment primary key,
    tipo_manut varchar(255) not null,
    servico varchar(255) not null,
    causa varchar(255) not null,
    valor_manut int not null,
    km int not null,
    id_veiculo int,
    dt_manutencao datetime
);




create table tb_marca
(
    id_marca int not null auto_increment primary key,
    marca varchar(255)
);

create table tb_produto_manutencao
(
    id_prodmanut int not null auto_increment primary key,
    id_produto int,
    qt_produto int,
    id_manutencao int
);


create table tb_frota
(
    id_frota int not null auto_increment primary key,
    ds_frota varchar(255) not null
    
);

create table tb_modelo
(
    id_modelo int not null auto_increment primary key,
    id_marca int not null,
    desc_modelo varchar(255) not null
    
);

create table tb_seguro
(
	id_seguro int not null auto_increment primary key,
    desc_seguro varchar(255) not null,
    desc_sinistro varchar(255) not null,
    limite_garantia int not null,
    data_inicio int not null, 
    id_veiculo int not null
);

create table tb_multa
(
	id_multa int not null auto_increment primary key,
    dt_infracao datetime not null,
    ds_infracao varchar(255),
    id_veiculo int not null,
    ds_gravidade varchar(255) not null,
    qt_preco double,
    id_motorista int,
    ds_status varchar(20)
);

alter table tb_seguro 
add constraint fk_seguveicu foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_veiculo 
add constraint fk_veimarca foreign key (id_marca) references tb_marca (id_marca);

alter table tb_veiculo 
add constraint fk_veiseguro foreign key (id_seguro) references tb_seguro (id_seguro);

alter table tb_veiculo 
add constraint fk_veimodelo foreign key (id_modelo) references tb_modelo (id_modelo);

alter table tb_veiculo 
add constraint fk_veiempresa foreign key (id_empresa) references tb_empresa (id_empresa);

alter table tb_produto_manutencao 
add constraint fk_prodmanut foreign key (id_manutencao) references tb_manutencao(id_manutencao);

alter table tb_produto_manutencao 
add constraint fk_manutprod foreign key (id_produto) references tb_produto(id_produto);

alter table tb_manutencao 
add constraint fk_manutveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_abastecimento 
add constraint fk_abastveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_produto
add constraint fk_prodempresa foreign key (id_empresa) references tb_empresa(id_empresa);

alter table tb_estacionamento 
add constraint fk_estacveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_viagem 
add constraint fk_viagemveic foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_viagem 
add constraint fk_viagemmoto foreign key (id_motorista) references tb_motorista(id_motorista);

alter table tb_motorista 
add constraint fk_motoempresa foreign key (id_empresa) references tb_empresa (id_empresa);


alter table tb_locacao 
add constraint fk_locaempresa foreign key (id_empresa) references tb_empresa (id_empresa);

alter table tb_locacao 
add constraint fk_locafrota foreign key (id_frota) references tb_frota (id_frota);

alter table tb_locacao
add constraint fk_locaveiculo foreign key (id_veiculo) references tb_veiculo (id_veiculo);

alter table tb_veiculo 
add constraint fk_veifrota foreign key (id_frota) references tb_frota (id_frota);

alter table tb_modelo
add constraint fk_marca foreign key (id_marca) references tb_marca (id_marca);

alter table tb_viagem
add constraint fk_viagemempresa foreign key (id_empresa) references tb_empresa(id_empresa);

alter table tb_veic
add constraint fk_empresa foreign key (id_empresa) references tb_empresa(id_empresa);

alter table tb_veic
add constraint fk_frota foreign key (id_frota) references tb_frota(id_frota);

alter table tb_multa
add constraint fk_veiculomulta foreign key (id_veiculo) references tb_veiculo(id_veiculo);

alter table tb_multa
add constraint fk_motoristamulta foreign key (id_motorista) references tb_motorista(id_motorista);
#DELIMITER $$
#create trigger tr_data_vencimento after insert 
#	on tb_empresa
#	FOR EACH ROW
#	begin
#		set @tempo = (select tempo_contrato from tb_empresa where id_empresa = NEW.id_empresa);
#		set @dt_vc = adddate(CURDATE( ), INTERVAL @tempo MONTH);
#		insert into tb_empresa(dt_validadecontrato) values (@dt_vc);
 #   end$$
#DELIMITER ;
select * from tb_veiculo;
select * from tb_viagem;
insert tb_frota(ds_frota) values ("Caminhão");
insert tb_frota(ds_frota) values ("Caminhonete");
insert tb_frota(ds_frota) values ("Carro");
insert tb_frota(ds_frota) values ("Moto");
insert tb_frota(ds_frota) values ("Ônibus");
insert tb_frota(ds_frota) values ("Van");

insert tb_marca(marca) values ("BMW");
insert tb_modelo(id_marca,desc_modelo) values (1, "Um modelo ai 2009");

 insert tb_veiculo(id_marca ,id_modelo ,ds_proprietario ,id_empresa ,qt_cilindrada,qt_ano ,ds_cor, qt_quilometragem, qt_passageiros , qt_peso , ds_placa , nr_renavam ,ds_status ,id_frota ) values (1, 1, "Empresa", 1, 1, 2010, "Roxo", 121312, 5, 200, "AAA-000", "121312123", "Disponível", 1);
 
 insert into tb_viagem (end_origem, cidade_origem, data_saida, end_destino, cidade_destino, data_chegada, km, id_veiculo, id_empresa, id_motorista) values ("rua pipipi", "Santos", "2019-11-12", "Rua popopo", "São Vicente", "2019-11-12",1000, 2, 1, 1);

