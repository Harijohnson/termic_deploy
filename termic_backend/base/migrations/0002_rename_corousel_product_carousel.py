# Generated by Django 4.2.7 on 2024-01-02 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='corousel',
            new_name='carousel',
        ),
    ]
