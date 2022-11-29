import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getProys, projects, status } from 'src/store/reducer/proyects'
import CardProyectos from './CardProyectos';

function ListProyects() {
  const dispatch = useAppDispatch();
  const proyectos = useAppSelector(projects);
  const statusProjects = useAppSelector(status);

  useEffect(() => {
    dispatch(getProys({}));
  }, [dispatch]);

  if (statusProjects === 'loading') {
    return (<p>Loading</p>)
  } else {
    return (
      <article className='misProyectos'>
        <h2>Ultimos Proyectos</h2>
        <section className='homeProyectos'>
          {proyectos && proyectos.map((proyecto, i) => <CardProyectos key={i} Proyecto={proyecto} />)}
        </section>
      </article>
    )
  }
}

export default ListProyects