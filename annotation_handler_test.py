import annotation_handler as an
import os
import csv


def test1():
    assert os.path.isfile(an.FILE_PATH)
    check_header()


def test2():
    import annotation_handler
    check_header()


def test3():
    image_id = '1.png'
    annotation = [1, 2, 3]
    next_annotation = [4, 5, 6]
    an.update_row(image_id, annotation)
    # assert an.get_row(image_id), annotation
    print(an.get_row(image_id), ' ', annotation)
    an.delete_row(image_id)
    # assert an.get_row(image_id) == []
    print(an.get_row(image_id), ' ', [])
    an.update_row(image_id, next_annotation)
    # assert an.get_row(image_id) == next_annotation
    print(an.get_row(image_id), ' ', next_annotation)
    an.update_row(image_id, annotation)
    # assert an.get_row(image_id) == annotation
    print(an.get_row(image_id), ' ', annotation)
    check_header()


def test4():
    an.update_row('2.png', [2, 3, 4])
    test3()
    an.delete_row('2.png')
    test3()
    an.update_row('2.png', [3, 4, 5])
    test3()
    # assert an.get_row('2.png') == [3, 4, 5]
    print(an.get_row('2.png'), ' ', [3, 4, 5])
    check_header()


def check_header():
    with open(an.FILE_PATH, 'r') as inp:
        reader = csv.DictReader(inp)
        assert reader.fieldnames == an.HEADER


check_header()
test1()
test2()
test3()
test4()
