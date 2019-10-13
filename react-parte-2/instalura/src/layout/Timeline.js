import React from 'react';

export default function Timeline() {
  return (
    <div className="fotos container">
      <div className="foto">
        <header className="foto-header">
          <figure className="foto-usuario">
            <img src="https://z-p42-instagram.fcgh5-1.fna.fbcdn.net/vp/26199f64533075d8efc55d8cf61025ed/5E63DF46/t51.2885-19/11371263_1634929916785603_893539506_a.jpg?_nc_ad=z-m&_nc_ht=z-p42-instagram.fcgh5-1.fna.fbcdn.net" alt="foto do usuario" />
            <figcaption className="foto-usuario">
              <a href="#">
                alots
                  </a>
            </figcaption>
          </figure>
          <time className="foto-data">03/10/2016 20:13</time>
        </header>

        <img alt="foto" className="foto-src" src="https://z-p42-instagram.fcgh4-1.fna.fbcdn.net/vp/63997ccc056a03df31ad86da1c1c0856/5E1D0C47/t51.2885-15/e35/s1080x1080/62836417_339388646729442_3328091899438900259_n.jpg?_nc_ad=z-m&_nc_ht=z-p42-instagram.fcgh4-1.fna.fbcdn.net&_nc_cat=106" />

        <div className="foto-info">
          <div className="foto-info-likes">

            <a href="#">
              alots_ssa
                </a>

            ,

                <a href="#">
              rafael_rollo
                </a>

            curtiram

              </div>

          <p className="foto-info-legenda">
            <a className="foto-info-autor">autor </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
              </p>

          <ul className="foto-info-comentarios">
            <li className="comentario">
              <a className="foto-info-autor">seguidor </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                </li>
            <li className="comentario">
              <a className="foto-info-autor">seguidor </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
                </li>
            <li className="comentario">
              <a className="foto-info-autor">seguidor </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
                </li>
          </ul>
        </div>


        <section className="fotoAtualizacoes">
          <a href="#" className="fotoAtualizacoes-like">Likar</a>
          <form className="fotoAtualizacoes-form">
            <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
            <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
          </form>

        </section>





      </div> {/* fim .foto */}

    </div>
  );
}
