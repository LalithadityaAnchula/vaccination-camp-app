// import { useEffect, useState } from "react";

export default function Sessions({ isShowModal, setIsShowModal }) {
  return (
    <div className={`modal is-clipped ${isShowModal && "is-active"} section`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head has-background-success-light">
          <p className="modal-card-title">Active Sessions</p>
          <button
            onClick={(e) => {
              setIsShowModal(false);
            }}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          veritatis magni asperiores provident quis nesciunt soluta accusamus
          impedit voluptate doloribus?
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center is-align-items-center has-background-success-light">
          <button className="button is-success">Terminate all</button>
        </footer>
      </div>
    </div>
  );
}
