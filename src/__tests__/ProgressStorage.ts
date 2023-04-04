import { ProgressItem, ProgressStorage } from '../utils/ProgressStorage'

const lesson1 = { id: 'lesson1', duration: 100 }
const lesson2 = { id: 'lesson2', duration: 200 }
const lesson3 = { id: 'lesson3', duration: 300 }

const items: ProgressItem[] = [
  lesson1, lesson2, lesson3
]

const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  return { setItemMock, getItemMock };
}


describe('Home Page', () => {

  const { getItemMock, setItemMock } = mockLocalStorage();


  test('When LS is empty, return zero-progress',  () => {

    getItemMock.mockReturnValue('');

    const ps = new ProgressStorage('course1', items)

    expect(ps.getItemProgress('lesson1'))
      .toEqual({ time: 0, persent: 0, duration: 100 })
  })
  

  test('When LS have some data, load it',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 50 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getItemProgress('lesson1'))
      .toEqual({ time: 50, persent: 50, duration: 100 })
  })


  test('Saving data to LS',  () => {

    getItemMock.mockReturnValue('');

    const ps = new ProgressStorage('course1', items)
    ps.saveItemProgress('lesson1', 50)

    expect(setItemMock)
      .toHaveBeenCalledWith('progress_course1', JSON.stringify({ lesson1: 50 }))

    expect(ps.getItemProgress('lesson1'))
      .toEqual({ time: 50, persent: 50, duration: 100 })
  })


  test('Calculating common progress',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 50, lesson2: 100 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getProgress())
      .toEqual({ time: 150, persent: 25, duration: 600 })
  })
  

  test('getCurrentItem. When lesson1 and lesson2 are started, return 1 lesson',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 50, lesson2: 100 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getCurrentItem()).toEqual(lesson1)

  })

  
  test('getCurrentItem. When lesson1 is finished are started, return lesson2',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 100, lesson2: 100 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getCurrentItem()).toEqual(lesson2)

  })

  test('getCurrentItem. When lesson1 is locked, return lesson2',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 0, lesson2: 0 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getCurrentItem([ 'lesson1' ])).toEqual(lesson2)

  })

  test('getCurrentItem. When lesson1 is finished, and lesson2 is locked, return lesson3',  () => {

    getItemMock.mockReturnValue(JSON.stringify({ lesson1: 100, lesson2: 50 }));

    const ps = new ProgressStorage('course1', items)

    expect(ps.getCurrentItem([ 'lesson2' ])).toEqual(lesson3)

  })
})


